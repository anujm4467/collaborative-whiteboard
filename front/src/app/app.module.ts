import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CollaborativeWhiteboardModule } from '@collaborative-whiteboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasBasicComponent } from './components/canvas-basic/canvas-basic.component';
import { CanvasMirrorComponent } from './components/canvas-mirror/canvas-mirror.component';
import { DemoComponent } from './components/demo/demo.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { TextComponent } from './components/text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasMirrorComponent,
    DemoComponent,
    WhiteboardComponent,
    TabsComponent,
    HomeComponent,
    CanvasBasicComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    CollaborativeWhiteboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
