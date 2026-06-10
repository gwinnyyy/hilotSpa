import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemographicsComponent } from './components/demographics/demographics'; // <-- Import added

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemographicsComponent], // <-- Added to imports array
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'hilotspa-frontend';
}