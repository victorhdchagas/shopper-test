export interface ComputeRoutesResponse {
  routes: {
    routeLabels:
      | 'ROUTE_LABEL_UNSPECIFIED'
      | 'DEFAULT_ROUTE'
      | 'DEFAULT_ROUTE_ALTERNATE'
      | 'FUEL_EFFICIENT'
    legs: any
    distanceMeters: number
    duration: string
    staticDuration: string
    polyline: any
    description: string
    warnings: string[]
    viewport: any
    travelAdvisory: any
    optimizedIntermediateWaypointIndex: number[]
    localizedValues: any
    routeToken: string
  }[]
  fallbackInfo: {
    routingMode:
      | 'FALLBACK_ROUTING_MODE_UNSPECIFIED'
      | 'FALLBACK_TRAFFIC_UNAWARE'
      | 'FALLBACK_TRAFFIC_AWARE'
    reason: 'FALLBACK_REASON_UNSPECIFIED' | 'SERVER_ERROR' | 'LATENCY_EXCEEDED'
  }
  geocodingResults: {
    origin: GeocodedWaypoint
    destination: GeocodedWaypoint
    intermediates: GeocodedWaypoint[]
  }
}

interface GeocodedWaypoint {
  geocoderStatus: {
    code: number
    message: string
    details: {
      '@type': string
      [key: string]: string
    }[]
  }
  type: string[]
  partialMatch: boolean
  placeId: string
  intermediateWaypointRequestIndex: number
}
