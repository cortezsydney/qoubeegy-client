import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  addBooking(request) {
    this.socket.emit("add-booking", request);
  }

  onEvent(event): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, data => observer.next(data));
    });
  }
}
