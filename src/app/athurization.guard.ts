import { CanActivateFn } from '@angular/router';
 
export const athurizationGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
 
    if (state.url.indexOf('admin') >= 0) {
 
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      if (user.roleid == '1') {
        return true;
      }
 
      else {
        return false;
      }
 
    }
  else if (state.url.indexOf('home') >= 0) {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user.roleid == '2') {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false
  }
  }
  else {
    return false
  }
}
 
 