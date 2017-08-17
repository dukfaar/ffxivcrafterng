import { TestBed, inject } from '@angular/core/testing'

import { FilteredPublicProjectsService } from './filtered-public-projects.service'

describe('FilteredPublicProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilteredPublicProjectsService]
    });
  });

  it('should be created', inject([FilteredPublicProjectsService], (service: FilteredPublicProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
