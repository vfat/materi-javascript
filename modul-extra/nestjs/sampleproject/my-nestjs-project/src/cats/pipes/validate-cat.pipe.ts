import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class ValidateCatPipe implements PipeTransform {
  private readonly schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
  });

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(`Validation failed: ${error.message}`);
    }
    return value;
  }
}