import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PatchMovieDto } from './dto/patch-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  @Get('search')
  search(@Query('year') year: string) {
    console.log(year);
    return `We are searching for a moive made after: ${year}`;
  }

  @Get(':id')
  getOne(@Param('id') id: number): Movie | string {
    // const { id } = params;

    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto): boolean {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    return this.moviesService.deleteMovie(id);
  }
  // @Put(':id')
  // updateMovie(@Param('id') id: string, @Body() updateData: any) {
  //   return `This will update movie's all info with the id: ${id}`;
  // }
  @Patch(':id')
  patchMovie(@Param('id') id: number, @Body() patchData: PatchMovieDto): Movie {
    return this.moviesService.patchMovie(id, patchData);
  }
}
