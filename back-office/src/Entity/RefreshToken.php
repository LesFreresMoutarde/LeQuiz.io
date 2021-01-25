<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RefreshToken
 *
 * @ORM\Table(name="refresh_token", indexes={@ORM\Index(name="IDX_C74F2195D6C9F383", columns={"userId"})})
 * @ORM\Entity(repositoryClass="App\Repository\RefreshTokenRepository")
 */
class RefreshToken
{
    /**
     * @var string
     *
     * @ORM\Column(name="token", type="text", nullable=false)
     * @ORM\Id
     */
    private $token;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="`expirationDate`", type="datetimetz", nullable=false)
     */
    private $expirationDate;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="`userId`", referencedColumnName="id")
     */
    private $user;

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function getExpirationDate(): ?\DateTimeInterface
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(\DateTimeInterface $expirationDate): self
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }


}
