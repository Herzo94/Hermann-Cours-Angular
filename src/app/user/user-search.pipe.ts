import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/IUser';

@Pipe({
  name: 'userSearch'
})

export class UserSearchPipe implements PipeTransform {

  transform(value: IUser[], term: string = ''): IUser[] {
    if (Array.isArray(value)) {
      return value.filter(user => {
       const name = user.name.toLowerCase()
        return name.indexOf(term.toLowerCase()) > -1
      })
    } else {
      console.error('Given value must be an array! 💥')
      return []
    }
  }

}
