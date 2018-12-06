import React from "react";
import moment from "moment";
import styled from "styled-components";
import {
  UNTIL_AVAILABLE,
  IS_AVAILABLE,
  TECHNOLOGIES_EXPERIENCE
} from "../constants/airtableKeys";
import profilePhotoPlaceholder from "../assets/profilePhotoPlaceholder.png";
import githubIcon from "../assets/githubLogo.svg";
import linkedinIcon from "../assets/linkedinLogo.svg";
import * as r from "ramda";

const HomeContainer = styled.section.attrs({
  className: "black w-90 db center"
})``;

const HomeTitle = styled.h1.attrs({
  className: "f1 ttu mid-gray tc"
})``;

const ListingItemList = styled.ul.attrs({
  className: "ph0"
})``;

const ListingItem = styled.li.attrs({
  className:
    "list pa3 db mb2 bg-near-white br2 flex justify-between items-center"
})``;

const ListingItemNameText = styled.h3.attrs({
  className: "f3 b tracked ttu ma0"
})``;

const monthAvailable = listing => {
  if (listing.fields[IS_AVAILABLE] === "Yes") return "Currently available";
  const monthsUntilAvailableRaw = listing.fields[UNTIL_AVAILABLE];
  const monthsUntilAvailable = monthsUntilAvailableRaw.split(" ")[0];
  const month = moment(listing._rawJson.createdTime)
    .add(monthsUntilAvailable, "months")
    .format("MMMM");
  return `Available from ${month}`;
};

const ListingItemTag = styled.li.attrs(({ colour }) => ({
  className: `br3 f6 b pv1 ph2 bg-light-${colour} dib mb2 mr1 black`
}))``;

const SocialMediaLink = styled.a.attrs({
  className: "link flex justify-between items-center mr3 di"
})``;

const ListingItemAvailability = ({ listing }) => {
  const timeAvailable = monthAvailable(listing);
  return <div className="pa2 tr mid-gray">{timeAvailable}</div>;
};

const SocialMediaIcon = styled.div.attrs({
  className: "h2 w2"
})`
  background: ${({ imgUrl }) => `center / contain no-repeat url('${imgUrl}')`};
`;

const SocialMediaText = styled.div.attrs({
  className: "link"
})``;
const ListingTitle = styled.div.attrs({
  className: "flex justify-between"
})``;

const ListingJobTitle = styled.div.attrs({
  className: "flex justify-between b mb3"
})``;

const ListingBio = styled.div.attrs({
  className: "flex justify-between i"
})``;

const ListingTitleSocialMediaLinks = styled.div.attrs({
  className: "flex"
})``;

const ProfilePhoto = styled.div.attrs({
  className: "h4 w-20"
})`
  background: ${({ photo }) => {
    const url = photo && photo[0] && photo[0].thumbnails.large.url;
    return `center / contain no-repeat url('${url ||
      profilePhotoPlaceholder}')`;
  }};
`;

const ListingContentRight = styled.div.attrs({
  className: "w-70 flex flex-column justify-between"
})``;

const Home = ({ listings }) => {
  const listingsFiltered = r.pipe(
    r.reverse,
    r.filter(listing => {
      const fields = listing.fields;
      if (!fields[IS_AVAILABLE]) {
        if (fields[UNTIL_AVAILABLE] === "Other") return false;
        if (fields[UNTIL_AVAILABLE] === "") return false;
      }
      return true;
    })
  )(listings);

  return (
    <HomeContainer>
      <HomeTitle>Gaza Talent</HomeTitle>
      <ListingItemList>
        {r.map(listing => (
          <ListingItem key={listing.id}>
            <ProfilePhoto photo={listing.fields["Profile Photo"]} />
            <ListingContentRight>
              <ListingTitle>
                <ListingItemNameText>{listing.fields.Name}</ListingItemNameText>
                <ListingTitleSocialMediaLinks>
                  {listing.fields["GitHub URL"] && (
                    <SocialMediaLink href={listing.fields["GitHub URL"]}>
                      <SocialMediaIcon imgUrl={githubIcon} />
                    </SocialMediaLink>
                  )}
                  {listing.fields["LinkedIn URL"] && (
                    <SocialMediaLink href={listing.fields["LinkedIn URL"]}>
                      <SocialMediaIcon imgUrl={linkedinIcon} />
                    </SocialMediaLink>
                  )}
                </ListingTitleSocialMediaLinks>
              </ListingTitle>
              <ListingJobTitle>{listing.fields["Job Title"]}</ListingJobTitle>
              <ListingBio>{listing.fields["Bio"]}</ListingBio>
              <ListingItemAvailability listing={listing} />
              <section className="pl2" />
            </ListingContentRight>
          </ListingItem>
        ))(listingsFiltered)}
      </ListingItemList>
    </HomeContainer>
  );
};

export default Home;
