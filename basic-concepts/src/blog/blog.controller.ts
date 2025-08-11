import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';


@Controller('blog')
export class BlogController {
      constructor(private readonly blogService:BlogService){}
      @Get()
      findAll(){
            return this.blogService.findAll()
      }

      @Get(':id')
      ifindByID(@Param('id')id: string){
            return this.blogService.findByID(+id)
      }

@Get('unique-key/:key')
      findByKey(@Param('key')key: string){
            return this.blogService.findUniqueKey(key)
      }
}
