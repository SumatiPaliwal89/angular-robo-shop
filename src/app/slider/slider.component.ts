import { Component, model } from '@angular/core';

@Component({
  selector: 'bot-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  sliderValue=model(0);
}
