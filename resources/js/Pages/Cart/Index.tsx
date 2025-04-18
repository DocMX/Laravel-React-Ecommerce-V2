import CartItem from '@/Components/App/CartItem';
import CurrencyFormatter from '@/Components/Core/CurrencyFormatter';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GroupedCartItems, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CreditCardIcon } from 'lucide-react';

export default function Index({ csrf_token, cartItems, totalQuantity, totalPrice }: 
        PageProps<{ cartItems: Record<number, GroupedCartItems> }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Your Cart" />
            <div className="container mx-auto flex flex-col gap-4 p-8 lg:flex-row">
                <div className="card order-2 flex-1 bg-white lg:order-1 dark:bg-gray-800">
                    <div className="card-body">
                        <h2 className="text-lg font-bold">Shopping Cart</h2>
                        <div className="my-4">
                            {Object.keys(cartItems).length === 0 && (
                                <div className="py-2 text-center text-gray-500">
                                    You don't have any items yet.
                                </div>
                            )}
                            {Object.values(cartItems).map((cartItem) => (
                                <div key={cartItem.user.id}>
                                    <div className={'mb-4 flex items-center justify-center justify-between border-b border-gray-300 pb-4'}>
                                        <Link href="/" className={'underline'}>
                                            {cartItem.user.name}
                                        </Link>
                                        <div>
                                            <form action={route('cart.checkout')} method="post">
                                                <input type="hidden" name="_token" value={csrf_token} />
                                                <input type="hidden" name="vendor_id" value={cartItem.user.id} />
                                                <button className="btn btn-ghost btn-sm">
                                                    <CreditCardIcon className={'size-6'} />
                                                    Pay Only for this seller
                                                </button>
                                            </form>
                                        </div>
                                        <div className="card order-1 bg-white lg:order-2 lg:min-w-[260px] dark:bg-gray-800">
                                            <div className="card-body">
                                                Subtotal ({totalQuantity} items): &nbsp;
                                                <CurrencyFormatter amount={totalPrice} />
                                                <form action={route('cart.checkout')} method="post">
                                                    <input type="hidden" name="_token" value={csrf_token} />
                                                    <PrimaryButton className="rounded-full">
                                                        <CreditCardIcon className={'size-6'} />
                                                            Procced to checkout
                                                    </PrimaryButton>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {cartItem.items.map((item) => (
                                        <CartItem item={item} key={item.id} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
