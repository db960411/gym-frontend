import { Injectable } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private topic = '/topic/notifications';

  constructor(private stompService: StompService) { }

  connect(): void {
    this.stompService.initAndConnect();
  }

  subscribe(): Observable<any> {
    return this.stompService.subscribe(this.topic);
  }
}
