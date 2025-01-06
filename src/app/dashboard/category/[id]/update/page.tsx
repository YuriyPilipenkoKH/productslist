import AddNewProductForm from '@/components/forms/AddNewProductForm';
import UpdateCategoryForm from '@/components/forms/UpdateCategoryForm'
import MainModal from '@/components/modals/MainModal';
import { DeletingProductConfirmProps, EditProductProps, UpdateImgUrlProps } from '@/data/modalProps';
import { grabProducts } from '@/actions/grab-products';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

async function UpdateCategoryPage({ params }: Params) {

  const { id } = await params
    const data = await grabProducts(id)

  return (
    <section className='p-4 space-y-6 min-h-screen flex flex-col'>
        <UpdateCategoryForm 
        id={data?.id || ''} 
        name={data?.name || ''} />
        <hr />
        <h2 className='text-center my-2 '>Products below</h2>
        <div>
         <AddNewProductForm 
          categoryId= {data?.id || ''}/>
        </div>
        {(data?.products?.length ?? 0) > 0 ? (

          <table>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-1   text-sm uppercase tracking-wider'>
                Name
                </th>
                <th className='px-5 py-3 border-b-1   text-sm uppercase tracking-wider'>
                Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product, idx:number) => (
                <tr
                 key={idx}
                 className=' hover:bg-gray-700 transition duration-400'>
                  <td className='px-1 py-3  border-b text-center border-gray-200'>
                        {product.name}
                  </td>
                  
                  <td className='flex justify-center gap-3 px-2 py-3  border-b text-center border-gray-200'>

                    <MainModal 
                    modalTypes={UpdateImgUrlProps}
                    id={product.id}
                    name={product.name}
                    imgUrl={product.imageUrl}
                                  />
                    <MainModal 
                    modalTypes={EditProductProps}
                    id={product.id}
                    name={product.name}
                                  />
                    <MainModal 
                    modalTypes={DeletingProductConfirmProps}
                    id={product.id}
                    name={product.name}
                                  />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='text-center '> Add your first product
          </div>
        )}
    </section>
  )
}

export default UpdateCategoryPage