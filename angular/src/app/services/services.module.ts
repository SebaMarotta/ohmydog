import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserService, AuthService],
})
export class ServicesModule {}
