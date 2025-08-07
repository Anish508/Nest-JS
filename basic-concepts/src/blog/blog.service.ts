import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
      private readonly blogs = [
            {
                  id:1,
                  title: "Blog1",
                  blogUniqueKey: "blogUniq1"
            },
            {
                  id:2,
                  title: "Blog2",
                  blogUniqueKey: "blogUniq2"
            },
            {
                  id:3,
                  title: "Blog3",
                  blogUniqueKey: "blogUniq3"
            },
      ];

      findAll(){
            return this.blogs
      }
      findByID(id:number){
            return this.blogs.find(blog=>blog.id === id)
      }
      findUniqueKey(key: String){
            return this.blogs.find(blog=>blog.blogUniqueKey === key)
      }
}
