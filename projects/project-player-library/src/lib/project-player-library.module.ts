import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectPlayerLibraryComponent } from './project-player-library.component';
import { MainPlayerComponent } from './pages/main-player/main-player.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { CommonModule } from '@angular/common';
import { Event, NavigationEnd, NavigationStart, RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { DailogPopupComponent } from './shared/dialog-popup/dailog-popup.component';
import { AttachmentListingPageComponent } from './pages/attachment-listing-page/attachment-listing-page.component';
import { TaskDetailsPageComponent } from './pages/task-details-page/task-details-page.component';
import { IconListComponent } from './shared/icon-list/icon-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { SubtaskCardComponent } from './shared/subtask-card/subtask-card.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditTaskCardComponent } from './shared/edit-task-card/edit-task-card.component';
import { AttachmentCardComponent } from './shared/attachment-card/attachment-card.component';
import { AttachmentShowCardComponent } from './shared/attachment-show-card/attachment-show-card.component';
import { AddTaskPageComponent } from './pages/add-task-page/add-task-page.component';
import { PrivacyPolicyPopupComponent } from './shared/privacy-policy-popup/privacy-policy-popup.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { PreviewDetailsPageComponent } from './pages/preview-details-page/preview-details-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddFilesPageComponent } from './pages/add-files-page/add-files-page.component';
import { AddLinkPopupComponent } from './shared/add-link-popup/add-link-popup.component'
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FilesCardComponent } from './shared/files-card/files-card.component';
import { LearningResourcesComponent } from './pages/learning-resources/learning-resources.component';
import { SyncPageComponent } from './pages/sync-page/sync-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './shared/loader/loader.component';
import { StartImprovementPopupComponent } from './shared/start-improvement-popup/start-improvement-popup.component';
import { AttachmentPreviewComponent } from './shared/attachment-preview/attachment-preview.component';
import { Router } from '@angular/router';

const routes: Routes = [
  // { path: '' },
  { path: 'project-details', component: DetailsPageComponent },
  // { path: 'project-details/task-details/:taskId/:id', component: TaskDetailsPageComponent },
  { path: 'project-details/files/:id', component: AttachmentListingPageComponent },
  { path: 'project-details/task-details/:taskId/:id', component: TaskDetailsPageComponent },
  { path: 'project-details/add-task/:id', component: AddTaskPageComponent },
  { path: 'project-details/preview-details/:id', component: PreviewDetailsPageComponent},
  { path: 'project-details/add-files/:id', component: AddFilesPageComponent },
  { path: 'project-details/learning-resource/:taskId/:id/:fromDetailspage', component: LearningResourcesComponent},
  { path: 'project-details/sync', component: SyncPageComponent }
];

const MAT_CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
    weekDayA11yLabel: 'ddd',
  },
};

export function translateHttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ProjectPlayerLibraryComponent,
    MainPlayerComponent,
    TaskCardComponent,
    IconListComponent,
    TaskDetailsPageComponent,
    ProjectDetailsComponent,
    AttachmentListingPageComponent,
    AttachmentCardComponent,
    AttachmentShowCardComponent,
    SubtaskCardComponent,
    EditTaskCardComponent,
    DailogPopupComponent,
    AddTaskPageComponent,
    PreviewDetailsPageComponent,
    PrivacyPolicyPopupComponent,
    AddFilesPageComponent,
    AddLinkPopupComponent,
    FilesCardComponent,
    DetailsPageComponent,
    LearningResourcesComponent,
    SyncPageComponent,
    LoaderComponent,
    StartImprovementPopupComponent,
    AttachmentPreviewComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatSnackBarModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatProgressSpinnerModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_CUSTOM_DATE_FORMATS,
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-in',
    },
    provideNativeDateAdapter()
  ]
})
export class ProjectPlayerLibraryModule {
  constructor(private translate: TranslateService, private router: Router) {
    // console.log('Module constructor called')
    this.setLanguage();
    this.router.events.subscribe((event: Event) => {
      // console.log('ROUTER EVENTS IN PLAYER 1: ',event)
      if (event instanceof NavigationEnd) {
        // console.log('ROUTER EVENTS IN PLAYER 2: ',event)
        // this.router.navigate([event.url]) //infinite loop
      }
      if (event instanceof NavigationStart) {
        // console.log('Navigation start(PLAYER MODULE)',event)
        if (event.navigationTrigger === 'popstate') {
          // console.log('Back button was clicked!(PLAYER MODULE)');
        }
      }
    });
  }

  // ngOnInit() {
  //   console.log('Player module Onint')
  //   this.router.events.subscribe((event: Event) => {
  //     if (event instanceof NavigationStart) {
  //       if (event.navigationTrigger === 'popstate') {
  //         console.log('Back button was clicked!(PLAYER MODULE)');
  //       }
  //     }
  //   });
  // }

  setLanguage() {
    this.translate.setTranslation('en', require('./assets/i18n/en.json'));
    this.translate.setDefaultLang('en');
  }
}
