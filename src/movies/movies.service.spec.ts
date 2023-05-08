import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //individual test - it

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    const newMovie: CreateMovieDto = {
      title: '언니 이번생은 내가 왕비야',
      year: 2021,
      genres: [],
    };
    it('should return a movie', () => {
      service.createMovie(newMovie);
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
  });

  it('should throw 404 error', () => {
    try {
      service.getOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toEqual(
        `Not Found Exception. Movie with id:999 Not Found`,
      );
    }
  });

  describe('Should return changed movie info', () => {
    it('patchMovie()', () => {
      const newMovie: CreateMovieDto = {
        title: '언니 이번생은 내가 왕비야',
        year: 2021,
        genres: [],
      };
      service.createMovie(newMovie);
      service.patchMovie(1, {
        title: '이번 생은 내가 왕이야',
      });
      const changedMovie = service.getOne(1);
      expect(changedMovie.title).toEqual('이번 생은 내가 왕이야');
    });

    it('예외처리', () => {
      try {
        service.patchMovie(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Should remove movies item', () => {
    it('removeMovie()', () => {
      const newMovie: CreateMovieDto = {
        title: '언니 이번생은 내가 왕비야',
        year: 2021,
        genres: [],
      };
      service.createMovie(newMovie);
      service.deleteMovie(1);
      expect(service.getAll().length).toEqual(0);
    });
  });
});
