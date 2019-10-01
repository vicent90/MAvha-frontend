import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearTodosComponent } from './components/todos/crear-todos.component';
import { TodosComponent } from './components/todos/todos.component';


const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'crear-todo', component: CrearTodosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
