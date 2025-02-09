# AEC Hackathon Zürich 2025 - Projects Talking - Frontend Attribute Mapping Interface

One of the biggest challenges for companies to share data is the need to map ‘semantics’. This both on the level of attribute names as for attribute values. This is a problem that can very complicated as soon as you can’t do 1 to 1 mappings anymore, so we will consider those out of scope.

The goal for the hackathon would be to create a mapping sheet in json form for mapping:
field names, using an intermediate representation attribute name (localisation sheet)
field values, mapped to a uuid sheet for each intermediate representation key.

Though we probably can do some data-mining and apply some simple statistical analysis to solve 90%+ of the issue, there will always be a need for UIs to be able to verify data and manually re-map the remaining cases.

## React-flow

- Front-end only with local state: uploading/downloading json file
- React
- React-Flow for allowing linking
