import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './sample.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { generateFileName, imageFileFilter } from 'src/common/helper';
import * as path from 'path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        filename: { type: 'string', example: 'picture' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './media/files',
        filename: (req, file, callback) => {
          const fileName = generateFileName(file); // Generate unique filename for each file
          callback(null, fileName); // Save the file with the generated name
        },
      }),
    }),
  )
  uploadFile(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log('file', body, file);
    // Normalize the file path and replace backslashes with forward slashes
    const filePath = path
      .join('media', 'files', file.filename)
      .replace(/\\/g, '/');
    return {
      message: 'File uploaded successfully',
      filePath: filePath, // Returning the relative path to the uploaded file
    };
  }

  @Post('uploads')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // Indicates that multiple files are expected
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        category: { type: 'string', example: 'profile' },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './media/files',
        filename: (req, file, callback) => {
          const fileName = generateFileName(file); // Generate unique filename for each file
          callback(null, fileName); // Save the file with the generated name
        },
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // Set the file size limit to 5MB (in bytes)
      },
    }),
  )
  uploadFiles(@Body() body, @UploadedFiles() files: Express.Multer.File[]) {
    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      throw new BadRequestException('File size exceeds the 5MB limit');
    }
    // Normalize the file path and replace backslashes with forward slashes
    // Map through each file to get its normalized path
    const filePaths = files.map((file) =>
      path.join('media', 'files', file.filename).replace(/\\/g, '/'),
    );

    return {
      message: 'Files uploaded successfully',
      filePaths: filePaths, // Returning the paths for all uploaded files
    };
  }
}
