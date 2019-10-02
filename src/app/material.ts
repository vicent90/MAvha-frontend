import { NgModule } from '@angular/core';
import { MatToolbarModule, MatCardModule, MatProgressBarModule,
         MatInputModule, MatButtonModule, MatIconModule, MatListModule,
         MatTooltipModule, MatDialogModule, MatSelectModule,
         MatCheckboxModule } from '@angular/material';

const MaterialModules = [
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule
];

@NgModule({
    imports: [ MaterialModules ],
    exports: [ MaterialModules ],
})
export class MaterialModule { }
