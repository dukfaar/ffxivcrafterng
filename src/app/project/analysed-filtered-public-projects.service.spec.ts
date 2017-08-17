import { TestBed, inject } from '@angular/core/testing'

import { AnalysedFilteredPublicProjectsService } from './analysed-filtered-public-projects.service'

describe('AnalysedFilteredPublicProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalysedFilteredPublicProjectsService]
    });
  });

  it('should be created', inject([AnalysedFilteredPublicProjectsService], (service: AnalysedFilteredPublicProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
