
import BaseAPIClient from './BaseAPIClient'

class APIClient extends BaseAPIClient {
  constructor(
    {
      pathPrefix,
      ...config
    } = {
      pathPrefix: '',
    }
  ) {
    super({
      apiEndpoint: `${"http://localhost:8000/api"}${pathPrefix}`,
      ...config,
    })
  }
}

export default APIClient