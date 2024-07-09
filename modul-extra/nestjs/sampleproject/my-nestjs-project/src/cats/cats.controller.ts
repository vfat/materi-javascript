import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, UseInterceptors, UsePipes } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ValidateCatPipe } from './pipes/validate-cat.pipe';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@UseInterceptors(LoggingInterceptor) // Menerapkan interceptor pada seluruh controller
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(ValidateCatPipe)
  create(@Body() createCatDto: CreateCatDto) {
    try {
      this.catsService.create(createCatDto);
      return {
        message: 'Cat created successfully',
        success: true,
        data: createCatDto,
      };
    } catch (error) {
      return {
        message: 'Failed to create cat',
        success: false,
        data: error.message,
      };
    }
  }

  @Get()
  findAll() {
    try {
      const cats = this.catsService.findAll();
      return {
        message: 'Cats retrieved successfully',
        success: true,
        data: cats,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve cats',
        success: false,
        data: error.message,
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      const cat = this.catsService.findOne(id);
      if (!cat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Cat retrieved successfully',
        success: true,
        data: cat,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve cat',
        success: false,
        data: error.message,
      };
    }
  }

  @Put(':id')
  @UsePipes(ValidateCatPipe)
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    try {
      const cat = this.catsService.findOne(id);
      if (!cat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      this.catsService.update(id, updateCatDto);
      return {
        message: 'Cat updated successfully',
        success: true,
        data: this.catsService.findOne(id),
      };
    } catch (error) {
      return {
        message: 'Failed to update cat',
        success: false,
        data: error.message,
      };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      const cat = this.catsService.findOne(id);
      if (!cat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      this.catsService.remove(id);
      return {
        message: 'Cat removed successfully',
        success: true,
        data: cat,
      };
    } catch (error) {
      return {
        message: 'Failed to remove cat',
        success: false,
        data: error.message,
      };
    }
  }
}
