import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { IProduct } from '../../../../../type/product'
import { decodeJwt } from '../../../utils/decodeJwt'
import { restCall } from '../../../utils/restCall'
import { ButtonGroup } from '../ButtonGroup'

export const DeleteItemForm = ({ handleClose, product }: { handleClose: () => void, product: IProduct }) => {
  const submitData = () => {
    const cookieString = document.cookie;
    const cookieInfo = decodeJwt(cookieString);
    const headers = { Authorization: `Bearer ${cookieString.split('=')[1]}` }
    const data = { role: cookieInfo.user.role }
    restCall('delete', `product/${product.id}`, data, headers);
  }

  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900"> Delete Item </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to remove this item? All data will be permanently
                removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ButtonGroup handleClose={handleClose} submitData={submitData} name='Delete Item' />
    </>
  )
}
