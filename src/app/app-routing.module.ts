import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// TODO: Routing beenden für alle neuen Komponenten:
//   - Body aufräumen (nur noch routing)
//   - neue Komponenten erstellen für Kategorien
//   - Alle Komponenten Routing Kompatibel machen
//   - interfaces nutzen / eventuell umbauen