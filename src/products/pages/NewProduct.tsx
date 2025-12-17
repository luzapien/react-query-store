import { Button, Image, Input, Textarea } from '@heroui/react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useProductMutation } from '..'

interface FormInputs {
    title: string
    price: number
    description: string
    category: string
    image: string
}

export const NewProduct = () => {
    const productMutation = useProductMutation()

    const { control, handleSubmit, watch } = useForm<FormInputs>({
        defaultValues: {
            title: 'Abrigo rosa',
            price: 400,
            category: "men's clothing",
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing, elit sapien id cras ultrices. Orci sed dictum cum interdum pretium ornare sociosqu per at rhoncus, netus diam dapibus porta molestie condimentum magna venenatis',
            image: 'https://images.pexels.com/photos/29251265/pexels-photo-29251265.jpeg',
        },
    })

    const newImage = watch('image')
    console.log(newImage)

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        productMutation.mutate(data)
    }

    return (
        <div className='w-full flex-col'>
            <h1 className='text-2xl font-bold'>Nuevo producto</h1>

            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-around items-center'>
                    <div className='flex-col w-[500px]'>
                        <Controller
                            control={control}
                            name='title'
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    className='mt-2'
                                    type='text'
                                    label='Titulo del producto'
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='price'
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input
                                    value={field.value?.toString()}
                                    onChange={(ev) => field.onChange(+ev.target.value)}
                                    className='mt-2'
                                    type='number'
                                    label='precio del producto'
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='image'
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input
                                    value={field.value?.toString()}
                                    onChange={field.onChange}
                                    className='mt-2'
                                    type='url'
                                    label='Url del producto'
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='description'
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Textarea
                                    value={field.value}
                                    onChange={field.onChange}
                                    className='mt-2'
                                    label='Descripcion del producto'
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='category'
                            rules={{ required: true }}
                            render={({ field }) => (
                                <select
                                    value={field.value}
                                    onChange={field.onChange}
                                    className='rounded-md p-3 mt-2 bg-gray-800 w-full'
                                >
                                    <option value="men's clothing">Men's clothing</option>
                                    <option value="women's clothing">Women's clothing</option>
                                    <option value='jewelery'>Jewelery</option>
                                    <option value='electronics'>Electronics</option>
                                </select>
                            )}
                        />
                        <br />
                        <Button type='submit' isDisabled={productMutation.isPending} className='mt-2' color='primary'>
                            {productMutation.isPending ? 'Cargando...' : 'Crear producto'}
                        </Button>
                    </div>

                    <Image src={newImage} alt='Foto del producto' width={500} height={600} />
                </div>
            </form>
        </div>
    )
}
