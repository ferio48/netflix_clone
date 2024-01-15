declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  private router = inject(Router);
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '1088446251967-8ktg7ilpp8jtulbl7tkmm79kbt8gas7v.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });
    
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'circle',
      width: 300
    })
  }

  private decodeToken(token: string) {
    // atob() --> function used to decode the token.
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if(response) {
      //decode the token
      const payload = this.decodeToken(response.credential);
      //store the session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      // navigate to home/browser
      this.router.navigate(['browse']);
    }
  }
}