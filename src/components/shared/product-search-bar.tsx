"use client";

import { useMemo, useState } from "react";

import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";
import { UiInput } from "@/components/ui/input";
import {
  UiSelect,
  type UiSelectOption,
} from "@/components/ui/select";

export interface ProductSearchBarProps {
  onSearch?: (query: string) => void;
  onLocationChange?: (location: string) => void;
  onCategoryChange?: (category: string) => void;
  onPriceChange?: (priceRange: string) => void;
}

export function ProductSearchBar({
  onSearch,
  onLocationChange,
  onCategoryChange,
  onPriceChange,
}: ProductSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const locationOptions: UiSelectOption[] = useMemo(
    () => [
      { label: "All Locations", value: "all" },
      { label: "New York", value: "new-york" },
      { label: "Los Angeles", value: "los-angeles" },
      { label: "Chicago", value: "chicago" },
      { label: "Houston", value: "houston" },
    ],
    []
  );

  const categoryOptions: UiSelectOption[] = useMemo(
    () => [
      { label: "All Categories", value: "all" },
      { label: "Electronics", value: "electronics" },
      { label: "Furniture", value: "furniture" },
      { label: "Vehicles", value: "vehicles" },
      { label: "Home & Garden", value: "home" },
      { label: "Fashion", value: "fashion" },
      { label: "Sports", value: "sports" },
    ],
    []
  );

  const priceOptions: UiSelectOption[] = useMemo(
    () => [
      { label: "All Prices", value: "all" },
      { label: "$0 - $50", value: "0-50" },
      { label: "$50 - $100", value: "50-100" },
      { label: "$100 - $500", value: "100-500" },
      { label: "$500 - $1,000", value: "500-1000" },
      { label: "$1,000+", value: "1000" },
    ],
    []
  );

  const popularCategories = [
    "electronics",
    "fashion",
    "vehicles",
    "home",
    "sports",
  ];

  return (
    <div
      className="
        font-poppins
        rounded-[2rem]
        border
        border-success-100
        bg-gradient-to-br
        from-success-50
        via-background
        to-success-100/40
        p-4
        shadow-sm
        sm:p-6
        lg:p-8
      "
    >
      <div className="flex flex-col  gap-2">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            <UiInput
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search rentals or items for sale..."
              inputSize="lg"
              startIcon={
                <UiIcon
                  name="search"
                  size={18}
                  className="text-success-500"
                />
              }
              className="
                rounded-2xl
                border-success-100
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:border-success-300
                focus-visible:border-success-500
                focus-visible:ring-4
                focus-visible:ring-success-100
              "
            />
          </div>

          <UiButton
            className="
              h-12
              rounded-2xl
              bg-success-500
              px-8
              font-semibold
              text-white
              shadow-lg
              shadow-success-500/20
              transition-all
              duration-300
              hover:bg-success-600
              hover:shadow-success-500/40
              lg:min-w-[140px]
            "
          >
            <span className="flex items-center gap-2">
              <UiIcon name="search" size={16} />
              Search
            </span>
          </UiButton>
        </div>

        <div className="grid gap-4 grid-cols-3 md:grid-cols-2 xl:grid-cols-3 font-poppins">
          <UiSelect
            label="Location"
            value={location}
            onValueChange={(value) => {
              setLocation(value);
              onLocationChange?.(value);
            }}
            options={locationOptions}
            placeholder="Select location"
            selectSize="sm"
            searchable
            className="
              rounded-2xl
              border-success-100
              bg-white
              shadow-sm
              hover:border-success-300
              focus-visible:border-success-500
            "
            menuClassName="rounded-2xl border-success-100 shadow-xl"
          />

          <UiSelect
            label="Category"
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              onCategoryChange?.(value);
            }}
            options={categoryOptions}
            placeholder="Select category"
            selectSize="sm"
            searchable
            className="
              rounded-2xl
              border-success-100
              bg-white
              shadow-sm
              hover:border-success-300
              focus-visible:border-success-500
            "
            menuClassName="rounded-2xl border-success-100 shadow-xl"
          />

          <UiSelect
            label="Price Range"
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              onPriceChange?.(value);
            }}
            options={priceOptions}
            placeholder="Select price range"
            selectSize="sm"
            className="
              rounded-2xl
              border-success-100
              bg-white
              shadow-sm
              hover:border-success-300
              focus-visible:border-success-500
            "
            menuClassName="rounded-2xl border-success-100 shadow-xl"
          />
        </div>

        <div className="hidden flex-wrap   justify-center
        text-center items-center gap-2 pt-1 sm:flex">
          <span className="text-xs font-semibold font-barlow uppercase tracking-wide text-muted-foreground">
            Popular
          </span>

          {popularCategories.map((item) => (
            <UiButton
              key={item}
              type="button"
              size="sm"
              onClick={() => {
                setCategory(item);
                onCategoryChange?.(item);
              }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-success-100
                bg-white
                px-4
                py-2
                text-xs
                font-medium
                capitalize
                text-foreground
                shadow-sm
                transition-all
                duration-300
                hover:border-success-300
                hover:bg-success-50
                hover:text-success-600
              "
            >
              <UiIcon
                name="search"
                size={12}
                className="text-success-500"
              />

              {item}
            </UiButton>
          ))}
        </div>
      </div>
    </div>
  );
}