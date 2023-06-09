import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { WrapperDataInterceptor } from './@share/interceptors/wrapper-data.interceptor';
import { Reflector } from '@nestjs/core';
import { EntityValidationErrorFilter } from './@share/exceptions/entity-validation-error.filter';
import { ConstraintValidationErrorFilter } from './@share/exceptions/constraint-validation-error.filter';
import { NotFoundExceptionFilter } from './@share/exceptions/not-found-exception.filter';
import { ValueObjectValidationErrorFilter } from './@share/exceptions/value-object-validation-error.filter';
import { InvalidOwnershipErrorFilter } from './@share/exceptions/invalid-ownership.error.filter';
import { InvalidRoleErrorFilter } from './@share/exceptions/invalid-role.error.filter';
import { ConditionalErrorExceptionFilter } from './@share/exceptions/conditional-error.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new EntityValidationErrorFilter(),
    new ConstraintValidationErrorFilter(),
    new ValueObjectValidationErrorFilter(),
    new InvalidOwnershipErrorFilter(),
    new InvalidRoleErrorFilter(),
    new ConditionalErrorExceptionFilter(),
  );
}
