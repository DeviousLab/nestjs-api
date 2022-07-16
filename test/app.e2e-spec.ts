import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
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
    await app.listen(5000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:5000');
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'bruh@bruh.com',
      password: '123456',
    };
    describe('Signup', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody({ ...dto, email: '' })
          .expectStatus(400);
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody({ ...dto, password: '' })
          .expectStatus(400);
      });
      it('should throw error if no body', () => {
        return pactum
          .spec()
          .post('/auth/sign-up')
          .expectStatus(400);
      });
      it('should signup a user', () => {
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signiin', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/sign-in')
          .withBody({ ...dto, email: '' })
          .expectStatus(400);
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/sign-in')
          .withBody({ ...dto, password: '' })
          .expectStatus(400);
      });
      it('should throw error if no body', () => {
        return pactum
          .spec()
          .post('/auth/sign-in')
          .expectStatus(400);
      });
      it('should signin a user', () => {
        return pactum
          .spec()
          .post('/auth/sign-in')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get current user', () => {});

    describe('Edit current user', () => {});
  });

  describe('Bookmark', () => {
    describe('Create bookmark', () => {});

    describe('Get bookmarks', () => {});

    describe('Get bookmark by ID', () => {});

    describe('Edit bookmark', () => {});

    describe('Delete bookmark', () => {});
  });

  it.todo('Should pass');
});
