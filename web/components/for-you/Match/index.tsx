import PhotoViewer from '@/components/for-you/PhotoViewer'
import { AvailableCities, Listing, RankedListing } from 'ratedrentals-types'
import * as S from './styles'
import ListingViewer from '@/components/for-you/Listing'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import GoogleMap from '@/components/for-you/Listing/GoogleMap'
import { getListingById } from '@/utils/api'
import MainDetails from '@/components/for-you/Listing/MainDetails'
import { getBadges } from '@/utils/card'
import MapIcon from '@/components/global/icons/Map'
import PhotosIcon from '@/components/global/icons/Photos'
import CubeIcon from '@/components/global/icons/Cube'
import TourViewer from '@/components/for-you/ToursViewer'
import Filter from '@/components/global/icons/Filter'
import Bookmark from '@/components/global/icons/Bookmark'
import { PreferencesFormProvider } from '@/contexts/preferencesFormContext'
import PreferencesCard from '@/components/for-you/Match/PreferencesCard'
import Share from '@/components/global/icons/Share'
import { COMPANY_NAME, UNAVAILABLE_SYMBOL } from '@/utils/constants'
import { getForYouListingUrl } from '@/utils/url'
import { toUpperCaseFirstLetter } from '@/utils/miscellaneous'
import SavedListingsCard from '@/components/for-you/Match/SavedListingsCard'
import { useSavedListings } from '@/contexts/savedListingsContext'
import { useViewedListings } from '@/contexts/viewedListingsContext'
import { dateDifferenceInDays } from '@/utils/miscellaneous'
import { getAddressURL } from '@/utils/url'
import { useAppSelector } from '@/redux/hooks'
import ShareListingCard from '@/components/for-you/Match/ShareListingCard'
import Badge from '@/components/for-you/Listing/Badge'
import Contact from '@/components/global/icons/Contact'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Slide from '../Slide'
import ThreeDotsVertical from '@/components/global/icons/ThreeDotsVertical'
import { useFloating } from '@floating-ui/react-dom-interactions'

const HEADER_LOADING_TEXT = '----------------------------------'
const SIDEBAR_ICON_SIZE = {
  width: 20,
  height: 20,
}

const Match = ({
  rankedListing,
  resetSlides,
  listingData,
  isSlide,
  isForYouIdPage,
  isTouchDevice,
  navigateListingsComponent,
  isAvailable,
  isViewMoreDetailsState
}: {
  rankedListing?: RankedListing
  listingData?: { listing: Listing }
  resetSlides?: () => void
  isSlide: boolean
  isForYouIdPage: boolean
  isTouchDevice: boolean
  navigateListingsComponent: ReactNode
  isAvailable?: boolean
  isViewMoreDetailsState: {
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
  }
}) => {
  const [listing, setListing] = useState<Listing | undefined>(
    listingData ? listingData.listing : undefined
  )
  const [isLoading, setIsLoading] = useState(listingData ? false : true)
  const [isBottomOpen, setIsBottomOpen] = useState(false)
  const [currentIconOpen, setCurrentIconOpen] = useState('photos')
  const isPhotosOpen = useMemo(() => {
    return currentIconOpen === 'photos'
  }, [currentIconOpen])
  const isMapOpen = useMemo(() => {
    return currentIconOpen === 'map'
  }, [currentIconOpen])
  const isTour3dOpen = useMemo(() => {
    return currentIconOpen === 'tour3d'
  }, [currentIconOpen])
  const [tourIndex, setTourIndex] = useState(0)
  const [currentTour3diframe, setCurrentTour3diframe] =
    useState<HTMLIFrameElement>()
  const reloadiframeFunc = useCallback(() => {
    if (currentTour3diframe) {
      currentTour3diframe.src = currentTour3diframe.src
    }
  }, [currentTour3diframe])
  const [showPreferencesCard, setShowPreferencesCard] = useState(false)
  const [showSavedListingsCard, setShowSavedListingsCard] = useState(false)
  const [showShareListingCard, setShowShareListingCard] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const listingId = useMemo(() => {
    if (listingData) {
      return listingData.listing._id
    } else if (rankedListing) {
      return rankedListing._id
    } else {
      throw new Error('Could not get listing ID')
    }
  }, [listingData, rankedListing])
  const [isViewed, setIsViewed] = useState(true)
  const { ids: savedListingsIds, dispatchListingsData } = useSavedListings()
  const {
    ids: viewedListingsIds,
    dispatchListingsData: dispatchViewedListingsData,
  } = useViewedListings()
  const city = useAppSelector(state => state.city)
  const [showFirstPhotoBottom, setShowFirstPhotoBottom] = useState(true)
  let observer = useRef<IntersectionObserver | null>(null)
  const match = useRef(null)
  const [isThreeDotsMenuOpen, setIsThreeDotsMenuOpen] = useState(false)
  const [openShareMenu, setOpenShareMenu] = useState(false)
  const { x, y, reference, floating, strategy } = useFloating({
    open: openShareMenu,
    onOpenChange: setOpenShareMenu,
  })
  const [isListingAvailable, setIsListingAvailable] = useState(true)

  useEffect(() => {
    if (match.current && observer.current) {
      observer.current.observe(match.current)
    }
  }, [])

  useEffect(() => {
    if (!listing && rankedListing) {
      setIsLoading(true)
      getListingById(rankedListing['_id'])
        .then(data => {
          setListing(data.listing)
          setIsListingAvailable(data.isAvailable)
        })
        .finally(() => setIsLoading(false))
    }
  }, [rankedListing, listing])

  useEffect(() => {
    setIsSaved(
      savedListingsIds.findIndex(
        savedListingId => savedListingId === listingId
      ) !== -1
    )
  }, [savedListingsIds, listingId])

  useEffect(() => {
    if (viewedListingsIds) {
      setIsViewed(
        viewedListingsIds.findIndex(
          viewedListingId => viewedListingId === listingId
        ) !== -1
      )
    }
  }, [listingId, viewedListingsIds])

  const handleShareClick = async () => {
    try {
      let share = {}
      if (city && listing && listing.property.location.address.value) {
        share = {
          url: getAddressURL({
            city: city.name.value,
            address: listing.property.location.address.value,
            id: listingId
          }),
        }
      }
      if (navigator && navigator.canShare && navigator.canShare(share)) {
        await navigator.share(share)
      } else {
        setShowShareListingCard(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSaveClick = async () => {
    if (
      savedListingsIds.findIndex(
        savedListingId => savedListingId === listingId
      ) === -1
    ) {
      dispatchListingsData({
        type: 'add',
        payload: {
          id: listingId,
        },
      })
    } else {
      dispatchListingsData({
        type: 'remove',
        payload: {
          id: listingId,
        },
      })
    }
  }

  useEffect(() => {
    if (!isTouchDevice && !isLoading && listingId) {
      dispatchViewedListingsData({
        type: 'add',
        payload: {
          id: listingId,
          time: new Date().getTime(),
        },
      })
    }
  }, [dispatchViewedListingsData, isLoading, isTouchDevice, listingId])

  return (
    <>
      <PreferencesFormProvider>
        {showPreferencesCard ? (
          <PreferencesCard
            isTouchDevice={isTouchDevice}
            resetSlides={resetSlides}
            backgroundOnClick={() => {
              setShowPreferencesCard(false)
            }}
          />
        ) : null}
      </PreferencesFormProvider>
      {showSavedListingsCard && listing?.property.location.address.value ? (
        <SavedListingsCard
          isTouchDevice={isTouchDevice}
          backgroundOnClick={() => {
            setShowSavedListingsCard(false)
          }}
        />
      ) : null}
      {listing &&
      listing.property.location.address.value &&
      showShareListingCard ? (
        <ShareListingCard
          isTouchDevice={isTouchDevice}
          address={listing.property.location.address.value}
          backgroundOnClick={() => {
            setShowShareListingCard(false)
          }}
          id={listingId}
        />
      ) : null}
      {isTouchDevice ? (
        <>
          <S.MobileContainer
            isLoading={isLoading}
            isSlide={isSlide}
            ref={match}
          >
            <S.Sidebar show={showFirstPhotoBottom}>
              <S.Buttons>
                {listing ? (
                  <S.ContactButton as='a' href={listing.url} target='_blank'>
                    <Contact size={SIDEBAR_ICON_SIZE} />
                    Contact
                  </S.ContactButton>
                ) : null}
                <S.ShareButton onClick={handleShareClick}>
                  <Share size={SIDEBAR_ICON_SIZE} /> Share
                </S.ShareButton>
                <S.SaveButton onClick={handleSaveClick}>
                  <Bookmark isBookmarked={isSaved} size={SIDEBAR_ICON_SIZE} />{' '}
                  {isSaved ? 'Saved' : 'Save'}
                </S.SaveButton>
              </S.Buttons>
            </S.Sidebar>
            <S.GoogleMapWrapper isLoading={isLoading} show={isMapOpen}>
              {listing ? (
                <GoogleMap
                  coordinates={{
                    lat: listing.property.location.coordinates.lat,
                    lng: listing.property.location.coordinates.lng,
                  }}
                  id={listing.url + 'inMatch'}
                />
              ) : null}
            </S.GoogleMapWrapper>
            <TourViewer
              isTouchDevice={isTouchDevice}
              show={isTour3dOpen}
              tours={isLoading ? [] : listing ? listing.property.tours : []}
              isLoading={false}
              toursState={{
                index: tourIndex,
                setIndex: setTourIndex,
              }}
              setCurrentTour3diframe={setCurrentTour3diframe}
            />
            <S.Header show={showFirstPhotoBottom} isLoading={isLoading}>
                <S.HeaderIcon
                  show={!isForYouIdPage}
                  onClick={() => {
                    setShowPreferencesCard(true)
                  }}
                  style={{ opacity: showPreferencesCard ? '0.5' : '1' }}
                >
                  <Filter size={{ width: 20, height: 20 }} />
                </S.HeaderIcon>
                <S.HeaderTitle>
                  {isLoading
                    ? HEADER_LOADING_TEXT
                    : listing
                    ? `${listing.property.location.address.value}, ${listing.property.location.region.city}`
                    : ''}
                </S.HeaderTitle>
                <S.HeaderIcon
                  show={true}
                  onClick={() => {
                    setShowSavedListingsCard(true)
                  }}
                  style={{ opacity: showSavedListingsCard ? '0.5' : '1' }}
                >
                  <Bookmark
                    isBookmarked={false}
                    size={{ width: 20, height: 20 }}
                  />
                </S.HeaderIcon>
              </S.Header>
            <S.PhotoViewerWrapper>
              <PhotoViewer
                isViewMoreDetailsState={isViewMoreDetailsState}
                allowShowFullImage={true}
                showPhotoNumber={true}
                show={isPhotosOpen}
                isLoading={isLoading}
                photos={isLoading ? [] : listing ? listing.property.photos : []}
                photoState={{
                  index: photoIndex,
                  setIndex: setPhotoIndex,
                }}
                isTouchDevice={isTouchDevice}
              />
            </S.PhotoViewerWrapper>
            <S.Bottom
              open={isBottomOpen}
              onClick={e => {
                e.stopPropagation()
                setIsBottomOpen(false)
              }}
            >
              <S.ListingWrapper
                open={isBottomOpen}
                onClick={e => {
                  e.stopPropagation()
                  if (!isLoading) {
                    setIsBottomOpen(true)
                    dispatchViewedListingsData({
                      type: 'add',
                      payload: {
                        id: listingId,
                        time: new Date().getTime(),
                      },
                    })
                  }
                }}
              >
                <ListingViewer
                  isViewMoreDetailsState={isViewMoreDetailsState}
                  firstPhoto={listing?.property.photos[0]}
                  isTouchDevice={isTouchDevice}
                  listing={listing}
                  type={isBottomOpen ? 'card' : 'match'}
                  isBottomOpen={isBottomOpen}
                  threeDotsMenuPopup={null}
                  isAvailable={listingData && typeof isAvailable === 'boolean' ? isAvailable : isListingAvailable}

                >
                  <MainDetails
                    isAvailable={listingData && typeof isAvailable === 'boolean' ? isAvailable : isListingAvailable}
                    contactButtons={null}
                    isTouchDevice={isTouchDevice}
                    daysAgo={listing ? listing.meta.daysAgo : null}
                    isViewed={isViewed}
                    isLoading={isLoading}
                    rent={listing?.property.legal.rent ?? null}
                    dateUpdated={listing?.date.updated ?? null}
                    homeType={listing?.property.properties.type ?? null}
                    beds={listing?.property.properties.beds ?? null}
                    baths={listing?.property.properties.baths ?? null}
                    size={listing?.property.properties.size ?? null}
                    badges={listing ? getBadges(listing) : []}
                    type={isBottomOpen ? 'card' : 'match'}
                  >
                    <S.Icons>
                      {listing && listing.property.tours.length > 0 ? (
                        <>
                          <S.CurrentTour
                            onClick={e => {
                              e.stopPropagation()
                              reloadiframeFunc()
                            }}
                            show={isTour3dOpen}
                          >{`${tourIndex + 1} of ${
                            listing ? listing.property.tours.length : 1
                          } [Exit]`}</S.CurrentTour>
                          <S.IconWrapper
                            disabled={isLoading}
                            onClick={e => {
                              e.stopPropagation()
                              if (!isLoading) {
                                setCurrentIconOpen('tour3d')
                              }
                            }}
                            color='transparent'
                          >
                            <CubeIcon
                              color={
                                isTour3dOpen ? 'rgb(0, 122, 255)' : 'black'
                              }
                              size={{ width: 20, height: 20 }}
                            />
                          </S.IconWrapper>
                        </>
                      ) : null}
                      <S.IconWrapper
                        disabled={isLoading}
                        color='transparent'
                        onClick={e => {
                          e.stopPropagation()
                          if (!isLoading) {
                            setCurrentIconOpen('photos')
                            setShowFirstPhotoBottom(prev => !prev)
                          }
                        }}
                      >
                        <S.CurrentPhoto as='span' show={isPhotosOpen}>
                          {listing
                            ? `${photoIndex + 1} of ${
                                listing.property.photos.length
                              }`
                            : `- of -`}
                        </S.CurrentPhoto>
                        <PhotosIcon
                          size={{ width: 20, height: 20 }}
                          color={isPhotosOpen ? 'rgb(0, 122, 255)' : 'black'}
                        />
                      </S.IconWrapper>
                      <S.IconWrapper
                        disabled={isLoading}
                        onClick={e => {
                          e.stopPropagation()
                          if (!isLoading) {
                            setCurrentIconOpen('map')
                          }
                        }}
                        color='transparent'
                      >
                        <MapIcon
                          color={isMapOpen ? 'rgb(0, 122, 255)' : 'black'}
                          size={{ width: 20, height: 20 }}
                        />
                      </S.IconWrapper>
                    </S.Icons>
                  </MainDetails>
                </ListingViewer>
              </S.ListingWrapper>
            </S.Bottom>
            <S.FirstPhotoBottom show={showFirstPhotoBottom}>
              <S.Badges>
                {listing
                  ? getBadges(listing).map((badge, i) => {
                      return <Badge badge={badge} key={i} />
                    })
                  : null}
              </S.Badges>
            </S.FirstPhotoBottom>
          </S.MobileContainer>
        </>
      ) : (
        <Slide
          isViewMoreDetails={isViewMoreDetailsState.value}
          navigateListingsComponent={navigateListingsComponent}
          isTouchDevice={isTouchDevice}
          left={
            <>
              <PhotoViewer
                isViewMoreDetailsState={isViewMoreDetailsState}
                isTouchDevice={isTouchDevice}
                photos={listing?.property.photos ?? []}
                isLoading={false}
                show={true}
                photoState={{
                  index: photoIndex,
                  setIndex: setPhotoIndex,
                }}
                showPhotoNumber={false}
                allowShowFullImage={true}
              />
              {isMapOpen && (
                <S.DesktopGoogleMapContianer>
                  <S.DesktopGoogleMapWrapper
                    isLoading={isLoading}
                    show={isMapOpen}
                  >
                    {listing ? (
                      <GoogleMap
                        coordinates={{
                          lat: listing.property.location.coordinates.lat,
                          lng: listing.property.location.coordinates.lng,
                        }}
                        id={listing.url + 'inMatch'}
                      />
                    ) : null}
                  </S.DesktopGoogleMapWrapper>
                </S.DesktopGoogleMapContianer>
              )}
              {isTour3dOpen ? (
                <S.DesktopTourViewerContainer>
                  <S.DesktopTourViewerWrapper
                    isLoading={isLoading}
                    show={isTour3dOpen}
                  >
                    <TourViewer
                      show={isTour3dOpen}
                      tours={
                        isLoading ? [] : listing ? listing.property.tours : []
                      }
                      isLoading={false}
                      toursState={{
                        index: tourIndex,
                        setIndex: setTourIndex,
                      }}
                      setCurrentTour3diframe={setCurrentTour3diframe}
                      isTouchDevice={isTouchDevice}
                    />
                  </S.DesktopTourViewerWrapper>
                </S.DesktopTourViewerContainer>
              ) : null}
            </>
          }
          right={
            <ListingViewer
              isViewMoreDetailsState={isViewMoreDetailsState}
              firstPhoto={listing?.property.photos[0]}
              isTouchDevice={isTouchDevice}
              listing={listing}
              type={isBottomOpen ? 'card' : 'match'}
              isBottomOpen={isBottomOpen}
              isAvailable={listingData && typeof isAvailable === 'boolean' ? isAvailable : isListingAvailable}
              threeDotsMenuPopup={
                <>
                  <S.ThreeDotsIconWrapper
                    onClick={() => {
                      setIsThreeDotsMenuOpen(prev => !prev)
                    }}
                    isOpen={isThreeDotsMenuOpen}
                  >
                    <ThreeDotsVertical size={{ width: 20, height: 20 }} />
                  </S.ThreeDotsIconWrapper>
                  {isThreeDotsMenuOpen ? (
                    <S.ThreeDotsMenu>
                      <S.ThreeDotsMenuItems>
                        {!isForYouIdPage && (
                          <S.ThreeDotsMenuItem>
                            <S.ThreeDotsMenuItemButton
                              onClick={() => {
                                setShowPreferencesCard(true)
                              }}
                            >
                              <Filter size={{ width: 12, height: 12 }} />{' '}
                              Preferences
                            </S.ThreeDotsMenuItemButton>
                          </S.ThreeDotsMenuItem>
                        )}
                        <S.ThreeDotsMenuItem>
                          <S.ThreeDotsMenuItemButton
                            onClick={() => {
                              setShowSavedListingsCard(true)
                            }}
                          >
                            <Bookmark
                              isBookmarked={false}
                              size={{ width: 12, height: 12 }}
                            />{' '}
                            Saved listings
                          </S.ThreeDotsMenuItemButton>
                        </S.ThreeDotsMenuItem>
                      </S.ThreeDotsMenuItems>
                    </S.ThreeDotsMenu>
                  ) : null}
                </>
              }
            >
              <MainDetails
                isTouchDevice={isTouchDevice}
                daysAgo={listing ? listing.meta.daysAgo : null}
                isViewed={isViewed}
                isLoading={isLoading}
                rent={listing?.property.legal.rent ?? null}
                dateUpdated={listing?.date.updated ?? null}
                homeType={listing?.property.properties.type ?? null}
                beds={listing?.property.properties.beds ?? null}
                baths={listing?.property.properties.baths ?? null}
                size={listing?.property.properties.size ?? null}
                badges={listing ? getBadges(listing) : []}
                type={isBottomOpen ? 'card' : 'match'}
                contactButtons={
                  <S.ConactButtons>
                    <S.DesktopContactButton
                      style={{ opacity: isLoading ? '0.3' : '1' }}
                      as='a'
                      href={listing?.url ?? '#'}
                      target='_blank'
                    >
                      <Contact size={{ width: 13, height: 13 }} /> Contact
                    </S.DesktopContactButton>
                    <S.DesktopShareButton
                      disabled={isLoading}
                      style={{ opacity: isLoading ? '0.3' : '1' }}
                      ref={reference}
                      onClick={handleShareClick}
                    >
                      <Share size={{ width: 13, height: 13 }} /> Share
                    </S.DesktopShareButton>
                    <S.DesktopSaveButton
                      disabled={isLoading}
                      style={{ opacity: isLoading ? '0.3' : '1' }}
                      onClick={handleSaveClick}
                    >
                      <Bookmark
                        size={{ width: 16, height: 16 }}
                        isBookmarked={isSaved}
                      />
                    </S.DesktopSaveButton>
                  </S.ConactButtons>
                }
                isAvailable={isListingAvailable}
              >
                <S.DesktopIcons>
                  {listing && listing.property.tours.length > 0 ? (
                    <>
                      <S.CurrentTour
                        onClick={e => {
                          e.stopPropagation()
                          reloadiframeFunc()
                        }}
                        show={isTour3dOpen}
                      >{`${tourIndex + 1} of ${
                        listing ? listing.property.tours.length : 1
                      } [Exit]`}</S.CurrentTour>
                      <S.DesktopIconWrapper
                        disabled={isLoading}
                        onClick={e => {
                          e.stopPropagation()
                          if (!isLoading) {
                            setCurrentIconOpen('tour3d')
                          }
                        }}
                        color='transparent'
                      >
                        <CubeIcon
                          color={isTour3dOpen ? 'rgb(0, 122, 255)' : 'black'}
                          size={{ width: 20, height: 20 }}
                        />
                      </S.DesktopIconWrapper>
                    </>
                  ) : null}
                  <S.DesktopIconWrapper
                    disabled={isLoading}
                    color='transparent'
                    onClick={e => {
                      e.stopPropagation()
                      if (!isLoading) {
                        setCurrentIconOpen('photos')
                        setShowFirstPhotoBottom(prev => !prev)
                      }
                    }}
                  >
                    <S.CurrentPhoto as='span' show={isPhotosOpen}>
                      {listing
                        ? `${photoIndex + 1} of ${
                            listing.property.photos.length
                          }`
                        : `- of -`}
                    </S.CurrentPhoto>
                    <PhotosIcon
                      size={{ width: 20, height: 20 }}
                      color={isPhotosOpen ? 'rgb(0, 122, 255)' : 'black'}
                    />
                  </S.DesktopIconWrapper>
                  <S.DesktopIconWrapper
                    disabled={isLoading}
                    onClick={e => {
                      e.stopPropagation()
                      if (!isLoading) {
                        setCurrentIconOpen('map')
                      }
                    }}
                    color='transparent'
                  >
                    <MapIcon
                      color={isMapOpen ? 'rgb(0, 122, 255)' : 'black'}
                      size={{ width: 20, height: 20 }}
                    />
                  </S.DesktopIconWrapper>
                </S.DesktopIcons>
              </MainDetails>
            </ListingViewer>
          }
        />
      )}
    </>
  )
}

export default Match
