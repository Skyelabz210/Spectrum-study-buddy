/* eslint-disable */
// @ts-nocheck

import { Route as rootRouteImport } from './routes/__root'
import { Route as TutorRouteImport } from './routes/tutor'
import { Route as TipsRouteImport } from './routes/tips'
import { Route as SetupRouteImport } from './routes/setup'
import { Route as ScenariosRouteImport } from './routes/scenarios'
import { Route as PlanRouteImport } from './routes/plan'
import { Route as FlashcardsRouteImport } from './routes/flashcards'
import { Route as CornerRouteImport } from './routes/corner'
import { Route as IndexRouteImport } from './routes/index'
import { Route as CurriculumIndexRouteImport } from './routes/curriculum.index'
import { Route as CurriculumModuleIdRouteImport } from './routes/curriculum.$moduleId'

const TutorRoute = TutorRouteImport.update({ id: '/tutor', path: '/tutor', getParentRoute: () => rootRouteImport } as any)
const TipsRoute = TipsRouteImport.update({ id: '/tips', path: '/tips', getParentRoute: () => rootRouteImport } as any)
const SetupRoute = SetupRouteImport.update({ id: '/setup', path: '/setup', getParentRoute: () => rootRouteImport } as any)
const ScenariosRoute = ScenariosRouteImport.update({ id: '/scenarios', path: '/scenarios', getParentRoute: () => rootRouteImport } as any)
const PlanRoute = PlanRouteImport.update({ id: '/plan', path: '/plan', getParentRoute: () => rootRouteImport } as any)
const FlashcardsRoute = FlashcardsRouteImport.update({ id: '/flashcards', path: '/flashcards', getParentRoute: () => rootRouteImport } as any)
const CornerRoute = CornerRouteImport.update({ id: '/corner', path: '/corner', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const CurriculumIndexRoute = CurriculumIndexRouteImport.update({ id: '/curriculum/', path: '/curriculum/', getParentRoute: () => rootRouteImport } as any)
const CurriculumModuleIdRoute = CurriculumModuleIdRouteImport.update({ id: '/curriculum/$moduleId', path: '/curriculum/$moduleId', getParentRoute: () => rootRouteImport } as any)

const rootRouteChildren = {
  IndexRoute,
  CornerRoute,
  FlashcardsRoute,
  PlanRoute,
  ScenariosRoute,
  SetupRoute,
  TipsRoute,
  TutorRoute,
  CurriculumModuleIdRoute,
  CurriculumIndexRoute,
}

export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren as any)
