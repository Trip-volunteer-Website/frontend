import { inject } from '@angular/core';
 
import { CanActivateFn, Router } from '@angular/router';
 
import { ToastrService } from 'ngx-toastr';
 
export const athurizationGuard: CanActivateFn = (route, state) => {
 
  const router = inject(Router);
 
  const toastr = inject(ToastrService);
 
  const token = localStorage.getItem('token');
 
  if (token) {
 
    const userString = localStorage.getItem('user');
 
    const user = userString ? JSON.parse(userString) : null;
 
    if (!user) {
 
      toastr.error('Invalid user data');
 
      router.navigate(['security/login']);
 
      return false;
 
    }
 
    const isAdmin = user.RoleId === '1';
 
    const isUser = user.RoleId === '2'||user.RoleId === '3';
 
    const url = state.url;
 
    // admin logic
 
    if (isAdmin) {
 
      if (url.includes('userProfile')) {
 
        toastr.error('Admins cannot access user profiles');
        router.navigate(['/admin/admindashboard']);
        return false;
 
      }
 
      return true; // otherwise, allow admin
 
    }
 
    // user logic
 
    if (isUser) {
 
      if (url.includes('admin')) {
 
        toastr.error('This page is for admin only');
 
        router.navigate(['home']);
 
        return false;
 
      }
 
      return true;
 
    }
 
    toastr.error('Access denied');
 
    router.navigate(['security/login']);
 
    return false;
 
  }
 
  toastr.error('You must be logged in');
 
  router.navigate(['security/login']);
 
  return false;
 
};
 
 