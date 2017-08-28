import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Observable, Subscription, Subject } from 'rxjs'

import { Project } from '../project.type'
import { Step } from '../step.type'
import { ProjectAnalysisData } from '../project-analysis-data.type'
import { ObservableProjectAnalysisService } from '../observable-project-analysis.service'

import { RestResource, RestService } from '../../rest'
import { SocketComponent, SocketService } from '../../socket'

import * as _ from 'lodash'

@Component({
  selector: 'project-viewer',
  templateUrl: 'project-viewer.component.html'
})
export class ProjectViewerComponent extends SocketComponent implements OnInit, OnDestroy {
  paramSub: Subscription
  projectResource: RestResource<Project>

  project: Subject<Project> = new Subject()
  observableAnalysisData: Observable<ProjectAnalysisData>
  analysisDataSubscription: Subscription
  analysisData: ProjectAnalysisData

  constructor(private route: ActivatedRoute, private rest: RestService, private analysisService: ObservableProjectAnalysisService, socket: SocketService) {
    super(socket)
    this.projectResource = this.rest.createResource<Project>('/api/rest/project')
  }

  private stepIsInTreeStep(stepId: string, tree: Step) {
    if (tree._id === stepId) return true

    if (tree.inputs && tree.inputs.length > 0) return _.some(tree.inputs, input => this.stepIsInTreeStep(stepId, input))

    return false
  }

  private stepIsInTree(stepId:string) {
    return this.stepIsInTreeStep(stepId, this.analysisData.project.tree)
  }

  ngOnInit() {
    this.onSocket('project data changed', data => { if(this.analysisData && this.analysisData.project._id === data.projectId) this.fetchProject(this.analysisData.project._id) })
    this.onSocket('project stock changed', data => { if(this.analysisData && this.analysisData.project._id === data.projectId) this.fetchProject(this.analysisData.project._id) })
    this.onSocket('project step data changed', data => { if(this.analysisData && this.stepIsInTree(data.stepId)) this.fetchProject(this.analysisData.project._id) })

    this.observableAnalysisData = this.analysisService.analyseProject(this.project)
    this.analysisDataSubscription = this.observableAnalysisData.subscribe(data => { this.analysisData = data })

    this.paramSub = this.route.params.subscribe(params => {
      this.fetchProject(params['id'])
    })
  }

  fetchProject(id: string) {
    this.projectResource.get(id + '?populate=tree').subscribe(project => { this.project.next(project) })
  }

  ngOnDestroy() {
    this.analysisDataSubscription.unsubscribe()
    this.paramSub.unsubscribe()
  }
}
