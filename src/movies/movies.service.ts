import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { findIndex as findIndexHandler } from 'src/util/util';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PatchMovieDto } from './dto/patch-movie.dto';

@Injectable()
export class MoviesService {
  private readonly movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    console.log(typeof id);
    const findMovie: Movie | undefined = this.movies.find((movie) => {
      return movie.id === +id;
    });

    if (findMovie === undefined) {
      throw new NotFoundException(
        `Not Found Exception. Movie with id:${id} Not Found`,
      );
    }

    return findMovie;
  }

  deleteMovie(id: number): void {
    const findMovie = this.getOne(id);
    if (findMovie) {
      const findIndex = findIndexHandler(this.movies, 'id', id);
      if (findIndex === -1) {
        throw new NotFoundException(`Syntax Error. find value ${id}`);
      }
      this.movies.splice(findIndex, 1);
    }
  }

  createMovie(movieData: CreateMovieDto): boolean {
    // const movie = new Movie(
    //   this.movies.length + 1,
    //   movieData.title,
    //   movieData.year,
    //   movieData.genres,
    // );

    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return true;
  }

  patchMovie(id: number, patchData: PatchMovieDto): Movie {
    const movie = this.getOne(id);
    const findIndex = findIndexHandler(this.movies, 'id', id);
    if (movie) {
      if (findIndex === -1) {
        throw new NotFoundException(`Syntax Error. find value ${id}`);
      }

      this.movies.splice(findIndex, 1, { ...movie, ...patchData });
    }

    return this.movies[findIndex];
  }
}
