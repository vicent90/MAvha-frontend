import { NgModule } from '@angular/core';
import { MatToolbarModule, MatCardModule,
         MatInputModule, MatButtonModule, MatIconModule, MatListModule,
         MatTooltipModule, MatDialogModule,
         MatCheckboxModule } from '@angular/material';

const MaterialModules = [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule
];

@NgModule({
    imports: [ MaterialModules ],
    exports: [ MaterialModules ],
})
export class MaterialModule { }
