import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CwCanvasComponent } from './components/cw-canvas/cw-canvas.component';
import { CwCutComponent } from './components/cw-cut/cw-cut.component';
import { CwDrawLineComponent } from './components/cw-draw-line/cw-draw-line.component';
import { CwToolGroupComponent } from './components/cw-tool-group/cw-tool-group.component';
import { CwToolComponent } from './components/cw-tool/cw-tool.component';
import { CwWhiteboardComponent } from './components/cw-whiteboard/cw-whiteboard.component';

const features = [
  CwCanvasComponent,
  CwCutComponent,
  CwDrawLineComponent,
  CwWhiteboardComponent,
  CwToolGroupComponent,
  CwToolComponent
];

@NgModule({
  declarations: [
    features,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    features
  ],
  entryComponents: [
    CwToolComponent
  ]
})
export class CollaborativeWhiteboardModule { }
