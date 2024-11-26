export const buildFakeFetcher = ({
  defaultReturn,
  defaultStatus = 200,
}: {
  defaultReturn?: unknown
  defaultStatus?: number
}): [
  (
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
  ) => Promise<Response>,
  () => typeof data,
] => {
  let data: {
    input: Omit<RequestInfo, 'referrer'> | URL
    init?: RequestInit | undefined
  } = { input: {}, init: undefined }
  const getData = () => data
  return [
    async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
      data = { input, init }
      return {
        arrayBuffer: async () => {
          return new ArrayBuffer(1)
        },
        blob: async () => {
          return new Blob()
        },
        json: async () => {
          return defaultReturn
        },
        body: null,
        bodyUsed: false,
        clone: console.log,
        formData: async () => new FormData(),
        headers: new Headers(),
        ok: true,
        redirected: false,
        status: defaultStatus,
        statusText: 'Ok',
        text: async () => 'Ok',
        type: 'basic',
        url: 'teste',
      } as Response
    },
    getData,
  ]
}
