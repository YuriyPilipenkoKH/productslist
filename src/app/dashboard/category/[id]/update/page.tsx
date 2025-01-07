
import UpdateCategoryForm from '@/components/forms/UpdateCategoryForm'
import MainModal from '@/components/modals/MainModal';
import { DeletingProductConfirmProps, EditProductProps, UpdateImgUrlProps } from '@/data/modalProps';
import { grabProducts } from '@/actions/grab-products';
import AddNewProductForm from '@/components/forms/AddNewProductForm';
import Link from 'next/link';
import capitalize from '@/lib/capitalize';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

async function UpdateCategoryPage({ params }: Params) {

  const { id } = await params
  const data = await grabProducts(id)
    // console.log(data);
    

  return (
    <section className='p-2 space-y-6 min-h-screen flex flex-col'>
      <h2 className='text-center '>Category {capitalize(data?.name)} </h2>
        <UpdateCategoryForm 
        id={data?.id || ''} 
        name={data?.name || ''} />
        <hr />
        <h2 className='text-center'>Products </h2>
        <div>
         <AddNewProductForm 
          categoryId= {data?.id || ''}/>
        </div>
        {(data?.products?.length ?? 0) > 0 ? (

          <table>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-1   text-sm uppercase tracking-wider headst'>
                Name
                </th>
                <th className='px-5 py-3 border-b-1   text-sm uppercase tracking-wider headst'>
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

                        <Link href={`/dashboard/product/${product.id}`}>
                        {product.name}
                        </Link>
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