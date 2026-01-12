import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';

import { sortOptions, type SortValue } from '../api/getData';
import type { ResponseFacet } from '../api/types';
import { classNames } from '../utils/classNames';

type ProductFilterProps = {
  facets: ResponseFacet[],
  activeFilters: Record<string, any>,
  onFilterChange: (facetId: string, option: any) => void,
  onClearAll: () => void,
  onSortChange: React.Dispatch<React.SetStateAction<SortValue>>,
  currentSort: SortValue,
};

export function ProductFilter({
  facets = [],
  activeFilters = {},
  onFilterChange,
  onClearAll,
  onSortChange,
  currentSort
}: ProductFilterProps) {
  const totalFiltersActive = Object.keys(activeFilters).length;

  return (
    <>
      <Disclosure as="section" className="grid items-center">
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div className="pr-6">
              <DisclosureButton className="group flex items-center font-medium text-gray-700 cursor-pointer">
                <FunnelIcon className="mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500" />
                {`${totalFiltersActive} Filter${totalFiltersActive === 1 ? '' : 's'}`}
              </DisclosureButton>
            </div>
            <div className="pl-6">
              <button
                type="button"
                onClick={onClearAll}
                className="text-gray-500 hover:text-indigo-600 transition cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        <DisclosurePanel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 gap-x-8 px-4 text-sm sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {facets.map((facet) => (
              <fieldset key={facet.identifier}>
                <legend className="block font-medium text-gray-900">{facet.displayName}</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {facet.options.map((option) => {
                    const isChecked = !!activeFilters[option.identifier];
                    const isDisabled = option.productCount === 0 && !isChecked;

                    return (
                      <div key={option.identifier} className="flex gap-3 items-center">
                        <div className="relative flex h-5 shrink-0 items-center">
                          <input
                            id={option.identifier}
                            type="checkbox"
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={() => onFilterChange(facet.identifier, option)}
                            className={classNames(
                              'size-4 rounded-sm border border-gray-300 text-indigo-600 focus:ring-indigo-600',
                              isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
                            )}
                          />
                        </div>
                        <label
                          htmlFor={option.identifier}
                          className={classNames(
                            isDisabled ? 'text-gray-300' : 'text-gray-600',
                            'text-sm',
                          )}
                        >
                          {/*
                            I have hard coded the current as £ as the facets doesn't return
                            the symbol to use like the products response does
                          */}
                          {facet.identifier === 'prices' ? '£' : ''}{option.displayValue}
                          <span className="ml-1 text-gray-400">({option.productCount})</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </DisclosurePanel>

        {/* SORT SECTION */}
        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block">
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort: {sortOptions.find((option) => option.value === currentSort)?.name}
                <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
              </MenuButton>

              <MenuItems transition className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                      <button
                        onClick={() => onSortChange(option.value as SortValue)}
                        className={classNames(
                          option.value === currentSort ? 'font-medium text-gray-900' : 'text-gray-500',
                          'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                        )}
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </>
  );
}
