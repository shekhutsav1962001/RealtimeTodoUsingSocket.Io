import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sktdemo';
  constructor(private webSocketService: WebsocketService) {

    window.addEventListener('focus', event => {
      // console.log("--------------------------")
      // console.log("welcone");
      // var w = window.innerWidth;
      // var h = window.innerHeight;
      // console.log("w", w);
      // console.log("h", h);
      // alert("welcome");
    });
    window.addEventListener('blur', event => {
      // console.log("--------------------------")
      // console.log("you have left the screen");
      // var w = window.innerWidth;
      // var h = window.innerHeight;
      // console.log("w", w);
      // console.log("h", h);
      // alert("you have left the screen");
    });

    window.addEventListener('resize', event => {
      // console.log("--------------------------")
      // console.log("you have resized the screen");
      // var w = window.innerWidth;
      // var h = window.innerHeight;
      // console.log("w", w);
      // console.log("h", h);

    });
  }
  ngOnInit() {



    this.webSocketService.listen('test event').subscribe(
      (data) => {
        console.log(data);
      }
    )

  }
}
