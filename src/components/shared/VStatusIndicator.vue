<template>
  <div class="status-indicator" :class="getStatusColor(props.status)">
    <span>{{ props.status }}</span>
  </div>
</template>
<script setup>
// in <script setup>
const props = defineProps({
  status: String,
});

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "paid":
      return "status-indicator--paid";
    case "pending":
      return "status-indicator--pending";
    case "draft":
      return "status-indicator--draft";
  }
}
</script>
<style lang="scss" setup>
@import "../../sass/_variables";
@import "../../sass/_colors";

.status-indicator {
  mix-blend-mode: normal;
  border-radius: 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  width: 5.777777rem;
  height: 2.222222rem;
  justify-self: flex-end;
  padding-left: 8px;
  span {
    font-style: normal;
    font-weight: 700;
    font-size: 0.666666rem;
    line-height: 0.833333rem;
    letter-spacing: -0.25px;
    position: relative;
    z-index: 1;
  }

  span::before {
    content: "";
    top: 0.222222rem;
    left: -0.888888rem;
    bottom: 0;
    position: absolute;
    width: 0.444444rem;
    height: 0.444444rem;
    border-radius: 100%;
  }
}

.status-indicator--paid {
  background-color: rgba(#33d69f, 0.06);

  span {
    color: #33d69f;
  }

  span::before {
    background-color: #33d69f;
  }
}

.status-indicator--pending {
  background-color: rgba(#ff8f00, 0.06);

  span {
    color: #ff8f00;
  }

  span::before {
    background-color: #ff8f00;
  }
}

.--light-mode {
  .status-indicator--draft {
    background-color: rgba(#373b53, 0.06);

    span {
      color: #373b53;
    }

    span::before {
      background-color: #373b53;
    }
  }
}

.--dark-mode {
  .status-indicator--draft {
    background-color: rgba($blue-gray-light, 0.06);

    span {
      color: $blue-gray-light;
    }

    span::before {
      background-color: $blue-gray-light;
    }
  }
}
</style>
