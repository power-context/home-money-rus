import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CuratLoader } from './components/not-found/loader/loader.component';

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      NgxChartsModule
    ],
    exports: [
      FormsModule,
      ReactiveFormsModule,
      NgxChartsModule,
      CuratLoader
    ],
    declarations: [CuratLoader]
})

export class SharedModule {}