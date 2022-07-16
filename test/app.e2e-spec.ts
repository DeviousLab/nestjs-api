import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      
    });

    describe('Signiin', () => {

    });
  });

  describe('User', () => {
    describe('Get current user', () => {

    });

    describe('Edit current user', () => {

    });
  });

  describe('Bookmark', () => {
    describe('Create bookmark', () => {

    });

    describe('Get bookmarks', () => {

    });

    describe('Get bookmark by ID', () => {

    });

    describe('Edit bookmark', () => {

    });

    describe('Delete bookmark', () => {

    });
  });

  it.todo('Should pass');
});
