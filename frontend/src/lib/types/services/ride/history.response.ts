interface HistoryDriver {
  id: number
  name: string
}
interface HistoryRide {
  id: number
  origin: string
  destination: string
  distance: number
  duration: string
  driver: HistoryDriver
  value: number
  created_at: string
}

export interface HistoryResponse {
  customer_id: string
  rides: HistoryRide[]
}
