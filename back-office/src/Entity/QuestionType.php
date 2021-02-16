<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionType
 *
 * @ORM\Table(name="question_type", uniqueConstraints={@ORM\UniqueConstraint(name="question_type_label_key", columns={"label"}), @ORM\UniqueConstraint(name="question_type_name_key", columns={"name"})})
 * @ORM\Entity(repositoryClass="App\Repository\QuestionTypeRepository")
 * @ORM\HasLifecycleCallbacks
 */
class QuestionType extends EntityBase
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\SequenceGenerator(sequenceName="question_type_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="label", type="string", length=80, nullable=false)
     */
    private $label;

    /**
     * @var bool
     *
     * @ORM\Column(name="`isChild`", type="boolean", nullable=false)
     */
    private $ischild;


    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getIschild(): ?bool
    {
        return $this->ischild;
    }

    public function setIschild(bool $ischild): self
    {
        $this->ischild = $ischild;

        return $this;
    }

    public function __toString()
    {
        return $this->name;
    }

}
