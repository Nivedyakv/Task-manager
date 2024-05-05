import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LogService } from '../../shared/userlogin/log.service';
@Injectable({
  providedIn:'root'
})
class PermissionsService {
  canActivate(userId: string): boolean {
    if(userId!=''){
      console.log(userId);
    return true;}
    else{
      console.log('else');
      return false;
    }
  }
}
export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const username:string=sessionStorage.getItem('username')||''
  return inject(PermissionsService).canActivate( username);

};