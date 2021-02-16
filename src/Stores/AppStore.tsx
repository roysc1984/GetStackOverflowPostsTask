
import { observable, action, computed, toJS, makeObservable } from 'mobx'
import api from '../Api/Api'

interface Tags {
  [key:number]: string
}

export interface Owner {
  reputation: number
  user_id: number
  user_type: string
  accept_rate: number
  profile_image: string
  display_name: string
  link: string
}

export interface QuestionsItem {
  tags: Tags[]
  owner: Owner
  is_answered : true
  view_count: number
  answer_count: number
  score: number
  last_activity_date: number
  creation_date: number
  question_id: number
  content_license: string
  link: string
  title: string
}

interface PostQuestions {
  has_more?: boolean
  quota_max?: number
  quota_remaining?: number
  items?: QuestionsItem[] 
}

export enum SORT_OPTION {
  DATE = 0,
  ANSWERS = 1,
  VIEWS = 2

}

export class AppStore {
  @observable loading: boolean = false
  @observable lightMode: boolean = false
  @observable postQuestions: PostQuestions = {}
  
  constructor() {
    makeObservable(this)
  }

  @action setPostQuestions = (questions: PostQuestions) => {
    this.postQuestions = questions
  }

  @action
  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  @action
  setLightMode = (mode: boolean) => {
    console.log('mode', mode)
    this.lightMode = mode
  }

  @action gePostQuestions = async (ids: string) => {
    this.setLoading(true)
    try {
      const res = await api.gePostQuestions(ids)
      if (res?.data) {
        this.setPostQuestions(res?.data)
      }
    } catch (error) {
      console.log('error in get Post questions: ', error)
    } finally {
      this.setLoading(false)
    }
  }

  @computed
  get questionsitems() {
    return toJS(this.postQuestions.items)
  }

  @computed
  get getSortQuestionsitemsDate() {
    return this.questionsitems?.length ? toJS(this.questionsitems.slice().sort((a, b) => a.creation_date - b.creation_date)) : this.questionsitems
  }

  @computed
  get getSortQuestionsitemsAnswers() {
    return this.questionsitems?.length ? toJS(this.questionsitems.slice().sort((a, b) => a.answer_count - b.answer_count)) : this.questionsitems
  }

  @computed
  get getSortQuestionsitemsViews() {
    return this.questionsitems?.length ? toJS(this.questionsitems.slice().sort((a, b) => a.view_count - b.view_count)) : this.questionsitems
  }
 
  @computed
  get totalQuestionsitems() {
    return this.postQuestions.items?.length || 0
  }

  @computed
  get getOwnerAvatar() {
    return this.questionsitems ? toJS(this.questionsitems[0]?.owner) : undefined
  }
}