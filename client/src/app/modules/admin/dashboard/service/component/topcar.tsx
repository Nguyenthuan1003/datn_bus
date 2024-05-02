import React from 'react';
import TopDataCar from './topDataCar';

const TopcarComponent = ({ datacar }: any) => {
    return (
        <div>
            <div className="mt-5 overflow-x-auto">
                <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
                    <thead className="text-left ltr:text-left rtl:text-right">
                        <tr>
                            <th className="px-4 py-2 text-xl font-bold text-gray-900 whitespace-nowrap">
                                Top
                            </th>
                            <th className="px-4 py-2 text-xl font-bold text-gray-900 whitespace-nowrap">
                               Tên xe 
                            </th>
                            <th className="px-4 py-2 text-xl font-bold text-gray-900 whitespace-nowrap">
                                Tổng số chuyến 
                            </th>
                            <th className="px-4 py-2 text-xl font-bold text-gray-900 whitespace-nowrap">
                                Doanh Thu <span className='text-sm font-mono'>(đ)</span>
                            </th>
                    
                            {/* <th className="px-4 py-2 text-xl font-bold text-gray-900 whitespace-nowrap">
                                Tổng số chuyến
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            datacar?.map((item: any, index: number) => (
                                <TopDataCar index={index} item={item} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopcarComponent;
