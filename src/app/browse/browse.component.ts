import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule], // commonModule helps in dependency injection
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
// JSON.parse() convert the json string into json object
/**
 * const jsonString = '{"name": "John", "age": 30}'
 * const parsedObject = JSON.parse(jsonString);
 * console.log(parsedObject.name); // Output: John
 */
export class BrowseComponent {
  auth = inject(AuthService);
  userName = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfile = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  userEmail = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  signOut() {
    console.warn(sessionStorage.getItem("loggedInUser"));
    sessionStorage.removeItem("loggedInUser");
    // console.warn(sessionStorage.getItem("loggedInUser"));
    this.auth.signOut();
  }
}
