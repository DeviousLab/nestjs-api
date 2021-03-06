import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      }
    });
  }

  getBookMarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      }
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      }
    });
    return bookmark;
  }

  async editBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      }
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new Error('Access denied');
    }
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,

      }, data: {
        ...dto,
      }
    });
  }

  async deleteBookmark(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      }
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new Error('Access denied');
    }
    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      }
    });
  }
}
